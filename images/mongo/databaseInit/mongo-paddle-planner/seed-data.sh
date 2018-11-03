#!/usr/bin/env bash

echo 'Creating application user and db'

mongo paddle-planner \
        --host localhost \
        --port 27017 \
        -u root \
        -p example \
        --authenticationDatabase admin \
        --eval "db.createUser({user: 'root', pwd: 'example', roles:[{role:'dbOwner', db: 'paddle-planner'}]});" && \
           mongo paddle-planner \
            --host localhost \
            --port 27017 \
            -u root \
            -p example \
            --authenticationDatabase paddle-planner \
            --eval "db.users.insertOne({username: 'alan', password: 'pass'})"

