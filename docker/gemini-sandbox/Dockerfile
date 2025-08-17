FROM arm64v8/alpine:3.14

RUN apk add --no-cache \
  nodejs npm \
  python3 py3-pip \
  make g++ git \
  curl wget jq bc \
  ripgrep fd \
  vim nano bash \
  ca-certificates

RUN mkdir -p /usr/local/share/npm-global \
  && addgroup -g 1001 nodeuser \
  && adduser -D -s /bin/bash -u 1001 -G nodeuser nodeuser \
  && chown -R nodeuser:nodeuser /usr/local/share/npm-global

ENV NPM_CONFIG_PREFIX=/usr/local/share/npm-global
ENV PATH=$PATH:/usr/local/share/npm-global/bin

USER nodeuser
WORKDIR /workspace

RUN npm install -g @google/gemini-cli

# THIS IS THE KEY FIX - Set gemini as the entrypoint
ENTRYPOINT ["gemini"]