import './cards.css';
import CardItem from './CardItem';

function Cards() {
  return (
    <div className='cards'>
     
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src='images/img-9.jpg'
              text='write up'
              label='theme'
              path='/services'
            />
            <CardItem
              src='images/img-2.jpg'
              text='write up'
              label='theme'
              path='/services'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src='images/img-3.jpg'
              text='write up'
              label='theme'
              path='/services'
            />
            <CardItem
              src='images/img-4.jpg'
              text='write up'
              label='theme'
              path='/products'
            />
            <CardItem
              src='images/img-8.jpg'
              text='theme'
              label='theme'
              path='/sign-up'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;