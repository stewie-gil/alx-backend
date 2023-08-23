#!/usr/bin/pytho3
"""
This module contains FIFOCache
It uses FIFO caching strategy
"""


from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """ FIFOClass
    """

    def __init__(self):
        """ init the FIFOClass
        """
        super().__init__()

    def put(self, key, item):
        """ Deletes if cache_data is greater than Max_ITEMS
        Args: key - key to add to the cache_data dict
        item: item to store with the key
        """
        if key and item is not None:
            self.cache_data[key] = item

        if len(self.cache_data) > self.MAX_ITEMS:
            to_discard = sorted(self.cache_data)[0]
            print("DISCARD", to_discard)
            del self.cache_data[to_discard]

    def get(self, key):
        """
        get the item based on the key
        key: key used for item retrieval
        """
        if key is None:
            return None
        if key not in self.cache_data:
            return None
        return self.cache_data[key]
