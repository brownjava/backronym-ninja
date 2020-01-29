#!/bin/bash
SERVER="ec2-52-38-124-234.us-west-2.compute.amazonaws.com"
KEY="backronym.pem"

ssh -i ${KEY} -L 9229:localhost:9229 ubuntu@${SERVER} "sudo killall -9 node"

rsync -av -e "ssh -i ${KEY}" --delete \
    --exclude="backronym.pem" --exclude=".git/" --exclude=".gitignore" --exclude=".vscode" --exclude="install.sh" --exclude="ssh.sh" --exclude="README.md" --exclude="config.js" --exclude="apsvideosignaller.service" --exclude="shell_in.sh" \
    $(dirname ${0}) \
    ubuntu@${SERVER}:/home/ubuntu/backronym/ && \
ssh -i ${KEY} ubuntu@${SERVER} "bash --login -c \"sudo systemctl restart backronym\""
