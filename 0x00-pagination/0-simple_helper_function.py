#!/usr/bin/env python3
""" Simple page index calculator"""


from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """ Args: page and page_size
    Returns: a tuple wih start index and end index """
    end_index = page * page_size
    start_index = end_index - page_size
    return (start_index, end_index)
