## Cookboo

- launch database

```sh
podman machine start
podman-compose up -d
podman-compose down
```

- install dependencies

```sh
npm i
```

- clean

```sh
npm run fmt
```

- startup

```sh
npm run start
```

- clean

```sh
npm run clean
```

## call

- Get all user

```sh
curl -X GET http://localhost:3000/u/all
```

- Get one user

```sh
curl -X GET http://localhost:3000/u/1
```

- Delete user

```sh
curl -X DELETE http://localhost:3000/u/3
```

- Add user

```sh
curl -X POST http://localhost:3000/u \
-H "Content-Type: application/json" \
-d '{
  "nickname": "魏无忌",
  "password": "han-guang-jun",
  "email": "wwj@gusu.com"
}'
```
