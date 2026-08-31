const CACHE_NAME = 'estudos-pwa-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    './manifest.json',
    './liber-sem-fundo.ico'
];

// Evento de Instalação: Salva os arquivos essenciais no cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Cache aberto');
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Evento de Ativação: Limpa caches antigos caso a versão (CACHE_NAME) mude
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('Limpando cache antigo:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento Fetch: Intercepta as requisições da rede e responde com o cache se estiver offline
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Retorna o arquivo do cache se encontrar, senão busca na rede
            return response || fetch(event.request);
        })
    );
});