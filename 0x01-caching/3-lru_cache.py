#!/usr/bin/pthon3
"""
LRUCache
"""


from base_caching import BaseCaching


class LRUCache(BaseCaching):
    def __init__(self):
        """ Init function
        """
        super().__init__()
        self.key = []

    def put(self, key, item):
        """ put function
        """
        if key in self.key:
            self.key.remove(key)
        self.key.append(key)

        self.cache_data[key] = item
        if key and item:
            if len(self.cache_data) > self.MAX_ITEMS:
                to_discard = self.key[0]
                print("DISCARD: ", to_discard)
                del self.cache_data[to_discard]
                self.key.remove(to_discard)

    def get(self, key):
        if key is None:
            return None
        if key not in self.cache_data:
            return None

        self.key.remove(key)
        self.key.append(key)

        return self.cache_data[key]
