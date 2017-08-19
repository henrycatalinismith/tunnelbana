import actions from '../actions';

const initialState = [
  { name: 'Red', color: '#fff000' },
  { name: 'Green', color: '#00c600' },
  { name: 'Blue', color: '#0273ff' },
];

export default function(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
