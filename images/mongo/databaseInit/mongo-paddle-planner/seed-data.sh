#!/usr/bin/env bash

echo 'Creating application user and db'

mongo ${APP_MONGO_DB} \
  --host ${APP_MONGO_HOST} \
  --port ${MONGO_PORT} \
  -u ${MONGO_ROOT_USER} \
  -p ${MONGO_ROOT_PASS} \
  --authenticationDatabase admin \
  --eval "db.createUser({user: '${APP_MONGO_USER}', pwd: '${APP_MONGO_PASS}', roles:[ {role:'dbOwner', db: '${APP_MONGO_DB}'} ]} );" && \
      mongo "${APP_MONGO_DB}" \
      --host ${APP_MONGO_HOST} \
      --port ${MONGO_PORT} \
      -u ${APP_MONGO_USER} \
      -p ${APP_MONGO_PASS} \
      --authenticationDatabase ${APP_MONGO_DB} \
      --eval "db.users.insertOne({username: '${APP_DEFAULT_USER}', password: '${APP_DEFAULT_PASS}'});"

