#!/usr/bin/env bash

rm -rf ./dist
npm run build
docker build -t registry.cn-hangzhou.aliyuncs.com/llchub/task-delivery-business-vue:1.0.0 .
docker push registry.cn-hangzhou.aliyuncs.com/llchub/task-delivery-business-vue:1.0.0
