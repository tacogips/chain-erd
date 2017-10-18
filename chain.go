package chain

import (
	"io"
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

//Load
func (chain Chain) Load(r io.Reader) error {
	//TODO tacogips impl
	return nil
}
