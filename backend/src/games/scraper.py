import bs4 as bs
import urllib.request
import time
import threading
from .models import Game


def return_digits(string):
    numbers = []
    string = string.split(' ')[5]
    for digit in string:
        if digit.isdigit():
            numbers.append(digit)
    numbers = ''.join(numbers)
    pages = int(numbers) / 25
    pages = int(pages) + 1
    return pages


def script():
    while True:
        src = urllib.request.urlopen(
            'https://store.steampowered.com/search/?sort_by=Released_DESC').read()
        soup = bs.BeautifulSoup(src, 'lxml')

        pages_count = soup.find_all('div', class_='search_pagination_left')
        pages_count = return_digits(pages_count[0].text)
        print(pages_count)

        games_names = []
        games_prices = []
        games_published = []
        games_images = []

        original_link = 'https://store.steampowered.com/search/?sort_by=Released_DESC&page='

        for i in range(2):
            current_link = original_link + str(i + 1)
            src = urllib.request.urlopen(current_link).read()
            soup = bs.BeautifulSoup(src, 'lxml')

            data_img = soup.find_all('div', 'col search_capsule')
            data_name = soup.find_all('span', class_='title')
            data_price = soup.find_all(
                'div', class_='col search_price_discount_combined responsive_secondrow')
            data_published = soup.find_all(
                'div', class_='col search_released responsive_secondrow')

            for index in range(len(data_name)):
                games_names.append(data_name[index].text)
                title = data_name[index].text
                games_published.append(data_published[index].text)
                published = data_published[index].text
                games_images.append(data_img[index].next.attrs['src'].replace(
                    'capsule_sm_120', 'header'))
                img = data_img[index].next.attrs['src'].replace(
                    'capsule_sm_120', 'header')
                price = list(data_price[index].attrs['data-price-final'])
                if len(price) != 1:
                    price.insert(-2, '.')
                price = ''.join(price)
                games_prices.append(price)
                gm = Game(title=title, price=price,
                          published=published, img=img)
                gm.save()
                time.sleep(1)

        zipped_data = zip(games_names, games_prices,
                          games_published, games_images)
        zipped_data = list(zipped_data)
        print(zipped_data)
        time.sleep(3600)


class activateScraper():
    t = threading.Thread(name='scraper', target=script)
    t.setDaemon(True)
    t.start()
