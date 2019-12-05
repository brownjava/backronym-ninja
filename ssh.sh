#!/bin/bash
SERVER="ec2-52-38-124-234.us-west-2.compute.amazonaws.com"
KEY="backronym.pem"

ssh -i ${KEY} -L 9229:localhost:9229 ubuntu@${SERVER} 

