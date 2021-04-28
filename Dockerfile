FROM nginx:alpine

COPY ./dist/ /usr/share/nginx/html
COPY ./default.conf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
