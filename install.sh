#!/bin/bash
SERVER="ec2-52-38-124-234.us-west-2.compute.amazonaws.com"
KEY="backronym.pem"

ssh -i ${KEY} -L 9229:localhost:9229 ubuntu@${SERVER} "sudo killall -9 node"

rsync -av -e "ssh -i ${KEY}" --delete \
    --exclude="backronym.pem" --exclude=".git/" --exclude=".gitignore" --exclude=".vscode" --exclude="install.sh" --exclude="config.js" --exclude="apsvideosignaller.service" --exclude="shell_in.sh" \
    $(dirname ${0}) \
    ubuntu@${SERVER}:/home/ubuntu/backronym/ # && \
#    ssh -i ${KEY} -L 9229:localhost:9229 ubuntu@${SERVER} "bash --login -c \"\
#        nohup sudo node backronym/server/lib/index.js &
#    \""
