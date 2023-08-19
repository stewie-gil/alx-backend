#!/usr/bin/env python3
"""
Deletion-resilient hpermedia pagination
"""

import csv
import math
from typing import List, Dict


class Server:
    """
Server class to paginate a database of popular baby names
"""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
                self.__dataset = dataset[1:]
            return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10) -> Dict:
        """ returns a dict with the following:
        index: the current page of the return page
        next_index: the next index to query with
        page_size: the current page size
        data: the actual page of the dataset
        """

        indexed_data = self.indexed_dataset()

        allowed_indexes = len(indexed_data)

        assert index < allowed_indexes and index >= 0, "Index out of range!"

        if (index + page_size) < allowed_indexes:
            next_index = index + page_size
        else:
            next_index = None

        new_data = []
        new_index = index

        for i in range(index, (index + page_size)):
            while new_index not in indexed_data:
                new_index = new_index + 1

            new_data.append(indexed_data[new_index])
            new_index = new_index + 1

        dictionary = {}
        dictionary["index"] = index
        dictionary["next_index"] = next_index
        dictionary["page_size"] = page_size
        dictionary["data"] = new_data
        return dictionary
