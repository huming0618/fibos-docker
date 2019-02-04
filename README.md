### To run the container as node
```
docker run --name fibos -p 8801:8801  -dt huming0618/fibos 
docker exec -d fibos ./run
```

### To check the status of running node
```
curl --request POST --url http://127.0.0.1:8801/v1/chain/get_info
```

### To create the account 
```
docker exec fibos ./create-account  testnetbabc1
```


