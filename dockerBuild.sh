#!/usr/bin/env bash

rm -rf ./www
npm run build-server
docker build -t registry.cn-hangzhou.aliyuncs.com/llchub/task-delivery-business-vue:1.0.0 .
docker push registry.cn-hangzhou.aliyuncs.com/llchub/task-delivery-business-vue:1.0.0
