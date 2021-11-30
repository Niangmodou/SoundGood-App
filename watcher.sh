#!/bin/bash

TARGET=/incoming/

inotifywait -m -e create -e moved_to --format "%f" $TARGET \
        | while read FILENAME
                do
                        echo Detected $FILENAME, moving and zipping
                        zip "$TARGET/$FILENAME"
			curl -X POST -L \
    -H "Authorization: Bearer <enter access token here>" \
    -F "metadata={name :'$TARGET/$FILENAME'};type=application/json;charset=UTF-8" \
    -F "file=@$TARGET/$FILENAME;type=application/zip" \
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart"
                done
