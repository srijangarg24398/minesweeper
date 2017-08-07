self.addEventListener('install',function(event){
	event.waitUntil(
		caches.open('minesweeper',function(cache){
			return cache.addAll([
				'/minesweeper.html',
				'/minesweeper.css',
				'/minesweeper.js',
				'/additional.js'
			])
		})
	)
})
self.addEventListener('fetch',function(event){
	event.respondWith(caches.match(event.request).
		then(function(response){
			return response||fetch(event.request)
		})
	)
})