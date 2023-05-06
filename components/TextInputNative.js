import {TextInput} from 'react-native';
import {View} from 'react-native';

const TextInputNative = ({setNotes}) => {
  return (
    <View className="px-4 mt-5 mb-5">
      <TextInput
        style={{
          width: '100%',
          height: 170,
          fontSize: 15,
          paddingTop: 30,
          padding: 10,
          alignSelf: 'center',
          color: 'black',
          backgroundColor: '#FFF',
          elevation: 2,
          borderWidth: 1,
          borderRadius: 20,
          backgroundColor: '#E2EDF6',
          borderColor: '#E2EDF6',
        }}
        cursorColor="white"
        placeholder="Any extra information that will help us find your car easily"
        textAlignVertical="top"
        placeholderTextColor="#000"
        multiline={true}
        onChangeText={text => setNotes(text)}
      />
    </View>
  );
};

export default TextInputNative;
