build-wallet:
  cd wallet && npm run build

dev: build-wallet
  npm run dev -- --open
 
build: build-wallet
  npm run build
