FROM nginx:1.27-alpine

LABEL maintainer="kubernetegatosdemo" \
      description="Web estatica de gatos con Nginx para Kubernetes"

COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY app.js /usr/share/nginx/html/app.js

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
