# kubernetegatosdemo

Web estática de gatos servida con **Nginx**, empaquetada en Docker y lista para desplegar en **Kubernetes**.

## Estructura

```text
kubernetegatosdemo/
├── index.html        # página principal
├── styles.css        # estilos
├── app.js            # galería de gatos
├── Dockerfile        # imagen basada en nginx:alpine
├── k8s/
│   ├── deployment.yaml
│   └── service.yaml
└── README.md
```

## Probar en local con Docker

```bash
docker build -t kubernetegatosdemo:latest .
docker run --rm -p 8080:80 kubernetegatosdemo:latest
# abre http://localhost:8080
```

## Desplegar en Kubernetes

1. Construye y publica la imagen (ajusta el registry a tu cuenta):

```bash
docker build -t ghcr.io/SamuelLeonV/kubernetegatosdemo:latest .
docker push ghcr.io/SamuelLeonV/kubernetegatosdemo:latest
```

2. Si usas otro registry, actualiza `image:` en `k8s/deployment.yaml`.

3. Aplica los manifiestos:

```bash
kubectl apply -f k8s/
kubectl get pods -l app=gatos
kubectl get svc gatos-service
```

4. Accede al servicio:

```bash
kubectl port-forward svc/gatos-service 8080:80
# abre http://localhost:8080
```

## Limpiar

```bash
kubectl delete -f k8s/
```
