!/bin/bash

#
# an utility shell scrip to create .jpg thubnail of videos
# move this file to the root folder of your Hugo project
#
#  you need to have a working version of ffmpeg installed on you machine
#



#
# create a thumbnail from the first frame
#
find content -name "*.mp4" -exec ffmpeg -i {} -ss 00:00:01 -vframes 1 "{}.jpg" \;

