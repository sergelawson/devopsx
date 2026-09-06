FROM nginx:stable-alpine3.24

# Remove the default website
RUN rm -rf /usr/share/nginx/html/*

# Copy your static files
COPY . /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]