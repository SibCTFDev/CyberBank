envsubst '$API_HOST' < /usr/share/nginx/nginx.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'