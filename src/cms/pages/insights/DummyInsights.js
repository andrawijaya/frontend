const articlesPublished = [
    { id: 1, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono', 'Iqbal Faraby'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 2, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 3, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 4, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Iqbal Faraby'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 5, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 6, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 7, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 8, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono', 'Iqbal Faraby'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 9, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 10, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
    { id: 11, title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor', categories: 'Product Management', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 1 },
]

const articlesDraft = [
    { id: 1, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 2, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 3, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 4, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 5, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 6, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 7, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 8, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 9, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 10, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 11, title: 'Interdum et malesuada fames ac ante ipsum primis in faucibus.', categories: 'Aenean sit amet sem est', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
]


const articlesArchive = [
    { id: 1, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 2, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 3, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 4, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 5, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 6, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 7, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 8, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 9, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
    { id: 10, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 2 },
    { id: 11, title: 'Donec eu accumsan ligula. Vivamus tincidunt lacus at malesuada maximus.', categories: 'Proin id dapibus eros', authors: ['Amabel Hadisoewono', 'Iqbal Faraby', 'Ocraniawan Patattan'], created_at: '2021-06-22T06:33:07.000Z', updated_at: '2021-07-22T06:33:07.000Z', status: 3 },
]


const topics = [
    { id: 1, title: 'Lorem Ipsum', tagline: 'loremipsum' },
    { id: 2, title: 'Dolor Sit Amet', tagline: 'loremipsum' },
    { id: 3, title: 'Sed ut perspiciatis', tagline: 'loremipsum' },
    { id: 4, title: 'Nemo enim ipsam', tagline: 'loremipsum' },
    { id: 5, title: 'Neque porro quisquam', tagline: 'loremipsum' },
    { id: 6, title: 'Ut enim ad minima veniam', tagline: 'loremipsum' },
    { id: 7, title: 'Quis autem vel eum ', tagline: 'loremipsum' },
    { id: 8, title: 'vel illum qui dolorem', tagline: 'loremipsum' },
    { id: 9, title: 'Excepteur sint occaecat', tagline: 'loremipsum' },
    { id: 10, title: 'Duis aute irure', tagline: 'loremipsum' },
    { id: 11, title: 'Lorem Ipsum', tagline: 'loremipsum' },
    { id: 12, title: 'Lorem Ipsum', tagline: 'loremipsum' },
]

const DummyInsights = {
    articlesArchive,
    articlesPublished,
    articlesDraft,
    topics
}

export default DummyInsights