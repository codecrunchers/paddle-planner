package main

import (
        "encoding/json"
        "github.com/apex/go-apex"
       )

type message struct {
    Hello string `json:"hello"`
}

func main() {
    apex.HandleFunc(func(event json.RawMessage, ctx *apex.Context) (interface{}, error) {
        return map[string]string{"hello": "world"}, nil
    })
}
