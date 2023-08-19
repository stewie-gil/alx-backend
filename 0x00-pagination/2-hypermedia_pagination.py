#!/usr/bin/env python3
"""using pagination by utilizing index range.

this module contains ;2the Server class"""


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
            page_size, int) and page_size > 0, "Value must a positive int"

        self.dataset()

        start, end = index_range(page, page_size)

        try:
            self.__dataset[start:end]
            return self.__dataset[start:end]
        except IndexError:
            return []

    def get_hyper(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ returns page_size, page, """
        dictionary = {}

        returned = self.get_page(page, page_size)

        start, end = index_range(page, page_size)

        dictionary["page_size"] = len(returned)

        dictionary["page"] = page

        total_items = len(self.dataset())

        total_pages = total_items / page_size

        if (page + 1) <= total_pages:
            next_page = page + 1
        else:
            next_page = None

        if (page - 1) > 0:
            prev_page = page - 1
        else:
            prev_page = None

        dictionary["data"] = self.get_page(page, page_size)
        dictionary["next_page"] = next_page
        dictionary["prev_page"] = prev_page
        dictionary["total_pages"] = total_pages
        return(dictionary)
