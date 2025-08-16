# Stage 1: The Builder
FROM rust:alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    musl-dev \
    pkgconfig \
    openssl-dev

# Copy and build dependencies first to leverage Docker's cache
COPY Cargo.toml Cargo.lock ./
RUN mkdir -p src && echo "fn main() {}" > src/main.rs
RUN cargo build --release
RUN rm -rf src target/release/deps/latex_service*

# Copy source and build the final application binary
COPY src ./src
RUN cargo build --release

# ---
# Stage 2: The Final, Minimal Runtime
FROM alpine:3.18

# Install all necessary runtime dependencies, including ca-certificates for HTTPS
# and fontconfig for font rendering.
RUN apk add --no-cache \
    ca-certificates \
    fontconfig \
    fontconfig-dev \
    gcompat \
    wget \
    tar \
    brotli-dev \
    libxml2-dev \
    zlib-dev \
    xz-dev \
    freetype-dev \
    musl \
    && rm -rf /var/cache/apk/* /tmp/*

# Install Tectonic (architecture-aware)
RUN ARCH=$(uname -m) && \
    case $ARCH in \
        x86_64) TECTONIC_ARCH="x86_64-unknown-linux-musl" ;; \
        aarch64) TECTONIC_ARCH="aarch64-unknown-linux-musl" ;; \
        *) echo "Unsupported architecture: $ARCH" && exit 1 ;; \
    esac && \
    wget -qO - "https://github.com/tectonic-typesetting/tectonic/releases/download/tectonic%400.14.1/tectonic-0.14.1-$TECTONIC_ARCH.tar.gz" | \
    tar -xzf - -C /usr/local/bin && \
    chmod +x /usr/local/bin/tectonic && \
    tectonic --version

# Ensure the glyphtounicode.tex file is available for compatibility.
RUN mkdir -p /usr/local/share/texmf/tex/latex/base && \
    wget -q -O /usr/local/share/texmf/tex/latex/base/glyphtounicode.tex "https://raw.githubusercontent.com/latex3/latex2e/main/base/glyphtounicode.tex" || \
    (echo "Primary URL failed, trying fallback..." && \
    wget -q -O /usr/local/share/texmf/tex/latex/base/glyphtounicode.tex "https://www.ctan.org/tex-archive/macros/latex/base/glyphtounicode.tex" || \
    (echo "Fallback URL also failed. Creating a placeholder file." && \
    echo "% Fallback glyphtounicode.tex" > /usr/local/share/texmf/tex/latex/base/glyphtounicode.tex))

# Copy application binary from the builder stage
COPY --from=builder /app/target/release/latex-service /usr/local/bin/latex-service

# Create a non-root user and set permissions
RUN adduser -D -s /bin/sh -u 1001 appuser && \
    mkdir -p /home/appuser/.cache/Tectonic /app/work /tmp && \
    chown -R appuser:appuser /home/appuser /app && \
    chmod +x /usr/local/bin/latex-service && \
    chmod 1777 /tmp

USER appuser

WORKDIR /app

EXPOSE 8080

ENV HOST=0.0.0.0 \
    PORT=8080 \
    RUST_LOG=error \
    HOME=/home/appuser \
    TMPDIR=/tmp

# Health check to verify the service is running
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO /dev/null http://localhost:8080/health || exit 1

ENTRYPOINT ["/usr/local/bin/latex-service"]