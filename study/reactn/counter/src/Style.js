import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
    rootContainer: {
        flex: 1
    },

      namePlate: {
        flex: 1,
        backgroundColor: '#3E606F',
        justifyContent: 'center',
        alignItems: 'center',

    },

    displayContainer: {
        flex: 2,
        backgroundColor: '#193441',
        justifyContent: 'center'
    },

    displayText: {
        color: 'white',
        fontSize: 80,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 20
    },

    inputContainer: {
        flex: 7,
        backgroundColor: '#3E606F',
        
    },
    v1: {
        flex:2,
        backgroundColor: 'powderblue',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#91AA9D',
        
    },
    v2: {
        flex:3,
        backgroundColor: 'skyblue',
        padding: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#91AA9D'
    },
    v3: {
        flex:5,
        backgroundColor: 'blue',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: '#91AA9D'
    },





});
    export default Style;
