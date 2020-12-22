# Treasure Game


	npm run build && surge --domain treasure.surge.sh

[Demo](http://treasure.surge.sh)

<a target='_blank' href='http://treasure.surge.sh'>
<img width="784" alt="treasure" src="https://user-images.githubusercontent.com/1690659/102909548-0f159d00-4471-11eb-995a-fed4b9b37d27.png">
	</a>

## Explanation

The idea here is to demonstrate the power of [binary search algorithms](https://en.wikipedia.org/wiki/Binary_search_algorithm) to non-programmers and beginner programmers. The user should first try and create a strategy for finding the treasure. Most likely the user will stumble upon a strategy very similar to binary search. Try starting with a [one dimensional array first](http://treasure.surge.sh/?easy).

Binary search strategy can be summarized by: dividing the grid in half each time until you reach one possible cell. The number of times it takes to divide a number in half until you reach one is the definition of log_base_2(N). Therefore, in this case the best number of guesses is log_base_2(totalCells). Checkout the [solver tab](http://treasure.surge.sh/?easy) to see binary search in action.

I would like to turn this in to a talk at some point and create a parallel to advent calendars. Here are [some slides](https://docs.google.com/presentation/d/e/2PACX-1vRBbkuDdhR95yGCsAGBmhvL_NXgW0LCnIzM9OO1b-P47Jl2WxpUbKC93f7dI47Hdr7J7Nxjp1ZMi1cF/pub?start=false&loop=false&delayms=3000).

Built with ❤️ by David Alberto Adler. Source code on github.

