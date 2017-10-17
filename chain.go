package chain

import (
	"io"
	"net/http"
)

//NewChain make new chain serve
func NewChain(config ChainConfig) *Chain {
	return &Chain{}
}

// ChainConfig
type ChainConfig struct {
}

// Chain
type Chain struct {
	Config ChainConfig
}

//HttpHandler
func (chain Chain) HttpHandler() http.Handler {
	//TODO tacogips impl

}

//Load
func (chain Chain) Load(r io.Reader) error {
	//TODO tacogips impl
	return nil
}
