import {
  View,
  ImageBackground,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useEffect, useState} from 'react';
import {
  getLike,
  postLike,
  getSave,
  postSave,
} from '../../storages/action/likeSave';
import {getMenuDetail} from '../../storages/action/recipe';
import {useDispatch, useSelector} from 'react-redux';
import {ToastProvider} from 'react-native-toast-notifications';
const DetailMenu = ({route, navigation}) => {
  const itemId = route.params?.itemId;
  const [recipe, setRecipe] = useState(null);
  const detailMenu = useSelector(state => state.detail_menuReducer);
  const dataLike = useSelector(state => state.getLikeReducer);
  const dataSave = useSelector(state => state.getSaveReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    getRecipe();
    getDataLikeSave();
  }, []);
  useEffect(() => {
    !detailMenu.isLoading && setRecipe(detailMenu.data);
  }, [detailMenu.isLoading]);
  const getRecipe = async () => {
    dispatch(getMenuDetail(itemId));
  };
  const getDataLikeSave = () => {
    dispatch(getLike());
    dispatch(getSave());
  };
  const likeHandle = () => {
    dispatch(postLike(itemId));
  };
  const saveHandle = () => {
    dispatch(postSave(itemId));
  };
  const checkLike = () => {
    let isLiked = dataLike.data?.filter(like => like.recipe_id == itemId);
    return isLiked.length > 0;
  };
  const checkSave = () => {
    let isSaved = dataSave.data?.filter(save => save.recipe_id == itemId);
    return isSaved.length > 0;
  };
  return (
    <ToastProvider>
      <View style={{position: 'relative'}}>
        <ImageBackground
          source={{uri: recipe?.photo}}
          resizeMode="cover"
          style={{
            height: '100%',
            width: '100%',
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'column',
              justifyContent: 'space-around',
              height: 450,
              backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}>
            <TouchableOpacity
              style={{marginLeft: 20}}
              onPress={() => navigation.navigate('HomeMain')}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                }}
                source={require('../../assets/images/backDetail.png')}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: 250}}>
                <Text
                  style={{
                    color: '#FFF',
                    fontSize: 30,
                    fontWeight: 'bold',
                    width: '50%',
                  }}>
                  {recipe?.title}
                </Text>
                <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                  {' '}
                  By chef {recipe?.author}
                </Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 30}}>
                {dataSave.data != null && checkSave() ? (
                  <TouchableOpacity onPress={saveHandle}>
                    <Image
                      source={require('../../assets/images/saved.png')}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={saveHandle}>
                    <Image
                      source={require('../../assets/images/save.png')}
                      style={{marginRight: 10}}
                    />
                  </TouchableOpacity>
                )}
                {dataLike.data != null && checkLike() ? (
                  <TouchableOpacity onPress={likeHandle}>
                    <Image source={require('../../assets/images/liked.png')} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity onPress={likeHandle}>
                    <Image source={require('../../assets/images/like.png')} />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            position: 'absolute',
            backgroundColor: '#FFF',
            width: '100%',
            height: 500,
            top: 400,
            borderRadius: 20,
            padding: 20,
          }}>
          <Text style={{fontSize: 25, fontWeight: 'bold'}}>Ingredients</Text>
          <View
            style={{
              marginTop: 10,
              backgroundColor: 'rgba(250, 247, 237, 1)',
              padding: 10,
              borderRadius: 10,
            }}>
            {recipe?.ingredients.split(',').map((item, index) => (
              <View key={index} style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    marginRight: 10,
                    color: 'rgba(102, 102, 102, 1)',
                    fontWeight: '900',
                  }}>
                  -
                </Text>
                <Text
                  style={{
                    color: 'rgba(102, 102, 102, 1)',
                    fontWeight: '900',
                    fontSize: 16,
                  }}>
                  {item}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </ToastProvider>
  );
};

export default DetailMenu;
