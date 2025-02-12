/*!
 * Original work Copyright 2019 SmugMug, Inc.
 * Modified work Copyright 2025 Nico Kaiser
 * Licensed under the terms of the MIT license.
 */

export interface LayoutOptions {
  rowHeight: number;
  rowWidth: number;
  spacing: number;
  heightTolerance: number;
}

/**
 * Row
 * Wrapper for each row in a justified layout.
 * Stores relevant values and provides methods for calculating layout of individual rows.
 */
class Row {
  top: number;
  rowWidth: number;
  spacing: number;
  rowHeight: number;
  heightTolerance: number;
  minAspectRatio: number;
  maxAspectRatio: number;
  items: {
    aspectRatio: number;
    top?: number;
    width?: number;
    height?: number;
    left?: number;
  }[] = [];
  height = 0;

  constructor(params: LayoutOptions & { top: number }) {
    this.top = params.top;

    this.rowWidth = params.rowWidth;
    this.spacing = params.spacing;
    this.rowHeight = params.rowHeight;
    this.heightTolerance = params.heightTolerance;

    this.minAspectRatio = (this.rowWidth / params.rowHeight) * (1 - params.heightTolerance);
    this.maxAspectRatio = (this.rowWidth / params.rowHeight) * (1 + params.heightTolerance);
  }

  /**
   * Attempt to add a single item to the row.
   * This is the heart of the justified algorithm.
   * This method is direction-agnostic; it deals only with sizes, not positions.
   *
   * If the item fits in the row, without pushing row height beyond min/max tolerance,
   * the item is added and the method returns true.
   *
   * If the item leaves row height too high, there may be room to scale it down and add another item.
   * In this case, the item is added and the method returns true, but the row is incomplete.
   *
   * If the item leaves row height too short, there are too many items to fit within tolerance.
   * The method will either accept or reject the new item, favoring the resulting row height closest to within tolerance.
   * If the item is rejected, left/right padding will be required to fit the row height within tolerance;
   * if the item is accepted, top/bottom cropping will be required to fit the row height within tolerance.
   *
   * @return {boolean} True if successfully added; false if rejected.
   */
  addItem(aspectRatio: number): boolean {
    const itemData = { aspectRatio };

    const newItems = this.items.concat(itemData);

    // Calculate aspect ratios for items only; exclude spacing
    const rowWidthWithoutSpacing = this.rowWidth - (newItems.length - 1) * this.spacing;
    const newAspectRatio = newItems.reduce(function (sum, item) {
      return sum + item.aspectRatio;
    }, 0);
    const targetAspectRatio = rowWidthWithoutSpacing / this.rowHeight;

    if (newAspectRatio < this.minAspectRatio) {
      // New aspect ratio is too narrow / scaled row height is too tall.
      // Accept this item and leave row open for more items.
      this.items.push(itemData);
      return true;
    } else if (newAspectRatio > this.maxAspectRatio) {
      // New aspect ratio is too wide / scaled row height will be too short.
      // Accept item if the resulting aspect ratio is closer to target than it would be without the item.
      // NOTE: Any row that falls into this block will require cropping/padding on individual items.
      if (this.items.length === 0) {
        // When there are no existing items, force acceptance of the new item and complete the layout.
        // This is the pano special case.
        this.items.push(itemData);
        this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
        return true;
      }

      // Calculate width/aspect ratio for row before adding new item
      const previousRowWidthWithoutSpacing = this.rowWidth - (this.items.length - 1) * this.spacing;
      const previousAspectRatio = this.items.reduce(function (sum, item) {
        return sum + item.aspectRatio;
      }, 0);
      const previousTargetAspectRatio = previousRowWidthWithoutSpacing / this.rowHeight;

      if (Math.abs(newAspectRatio - targetAspectRatio) > Math.abs(previousAspectRatio - previousTargetAspectRatio)) {
        // Row with new item is us farther away from target than row without; complete layout and reject item.
        this.completeLayout(previousRowWidthWithoutSpacing / previousAspectRatio);
        return false;
      } else {
        // Row with new item is closer to target than row without;
        // accept the new item and complete the row layout.
        this.items.push(itemData);
        this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
        return true;
      }
    } else {
      // New aspect ratio / scaled row height is within tolerance;
      // accept the new item and complete the row layout.
      this.items.push(itemData);
      this.completeLayout(rowWidthWithoutSpacing / newAspectRatio);
      return true;
    }
  }

  /**
   * Set row height and compute item geometry from that height.
   */
  completeLayout(newHeight: number) {
    const rowWidthWithoutSpacing = this.rowWidth - (this.items.length - 1) * this.spacing;
    let clampedToNativeRatio;

    // Clamp row height to edge case minimum/maximum.
    const clampedHeight = Math.max(0.5 * this.rowHeight, Math.min(newHeight, 2 * this.rowHeight));

    if (newHeight !== clampedHeight) {
      // If row height was clamped, the resulting row/item aspect ratio will be off,
      // so force it to fit the width (recalculate aspectRatio to match clamped height).
      // NOTE: this will result in cropping/padding commensurate to the amount of clamping.
      this.height = clampedHeight;
      clampedToNativeRatio = rowWidthWithoutSpacing / clampedHeight / (rowWidthWithoutSpacing / newHeight);
    } else {
      // If not clamped, leave ratio at 1.0.
      this.height = newHeight;
      clampedToNativeRatio = 1.0;
    }

    // Compute item geometry based on newHeight.
    let itemWidthSum = 0;
    for (const item of this.items) {
      item.top = this.top;
      item.width = item.aspectRatio * this.height * clampedToNativeRatio;
      item.height = this.height;
      item.left = itemWidthSum;
      itemWidthSum += item.width + this.spacing;
    }
  }
}

/**
 * Takes in a bunch of box data and config. Returns
 * geometry to lay them out in a justified view.
 */
export default function (aspectRatios: number[], layoutOptions: LayoutOptions) {
  let containerHeight = 0;
  let boxes: {
    aspectRatio: number;
    top?: number;
    width?: number;
    height?: number;
    left?: number;
  }[] = [];

  let currentRow;
  let lastRowHeight = 0;

  for (const aspectRatio of aspectRatios) {
    // If not currently building up a row, make a new one.
    if (!currentRow) {
      currentRow = new Row({ top: containerHeight, ...layoutOptions });
    }

    // Attempt to add item to the current row.
    let itemAdded = currentRow.addItem(aspectRatio);

    if (currentRow.height > 0) {
      // Row is filled; add it and start a new one
      lastRowHeight = currentRow.height;
      boxes = boxes.concat(currentRow.items);
      containerHeight += currentRow.height + layoutOptions.spacing;
      currentRow = new Row({ top: containerHeight, ...layoutOptions });

      // Item was rejected; add it to its own row
      if (!itemAdded) {
        itemAdded = currentRow.addItem(aspectRatio);

        if (currentRow.height > 0) {
          // If the rejected item fills a row on its own, add the row and start another new one
          lastRowHeight = currentRow.height;
          boxes = boxes.concat(currentRow.items);
          containerHeight += currentRow.height + layoutOptions.spacing;
          currentRow = new Row({ top: containerHeight, ...layoutOptions });
        }
      }
    }
  }

  // Handle any leftover content (orphans) depending on where they lie
  // in this layout update, and in the total content set.
  if (currentRow && currentRow.items.length) {
    currentRow.completeLayout(lastRowHeight || layoutOptions.rowHeight);
    boxes = boxes.concat(currentRow.items);
    containerHeight += currentRow.height + layoutOptions.spacing;
  }

  // Remove the height added for box spacing
  containerHeight -= layoutOptions.spacing;

  return { containerHeight, boxes };
}
