#!/usr/bin/env python3
""" using pagination by utilizing index range.

this module contains the Server class"""


from typing import Tuple, List
import csv
import math


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Args: page and page_size
    Returns: a tuple wih start index and end index """
    end_index = page * page_size
    start_index = end_index - page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of populr baby names.
"""
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset"""
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]
        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ takes two intergers """
        assert isinstance(
            page, int) and page > 0, "Value must be a positive integer"
        assert isinstance(
            page_size, int) and page_size > 0, "Value must be a positive integer"

        self.dataset()

        start, end = index_range(page, page_size)

        try:
            self.__dataset[start:end]
            return self.__dataset[start:end]
        except IndexError:
            return []
