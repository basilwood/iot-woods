const Style = {
    rootContainer: {
        flex: 1,
        backgroundColor: 'black'
    },
    namePlate: {
        height: 45,
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
    },
    displayContainer: {
        height: 40,
        backgroundColor: '#fff8dc',
        justifyContent: 'center',
        borderWidth: 1,
        borderBottomWidth: 3,
        borderColor: 'black',
    },

    displayText: {
        color: 'black',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    listcontainer: {
        flex: 8,
        backgroundColor: '#F6F6F6',
        borderWidth: 1,
        borderColor: 'black',
        borderBottomColor: 'red',
        alignItems: 'stretch'

    },
    backdrop: {
        flex: 1,
        padding: 10

    },
    backdropView: {
        flex: 9,
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    helpView: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0)',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headline: {
        fontSize: 22,
        paddingLeft: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontFamily: 'Iowan Old Style'
        },
    help: {
        fontSize: 25,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
    },
    helpListcontainer: {
        flex: 8,
        backgroundColor: 'beige',
    },
    helpContainer: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
        borderRadius: 5,
    },
    aboutContainer: {
        flex: 2,
        borderTopWidth: 1,
        borderColor: 'black',
    },
    backButton: {
        marginLeft: 5,
        fontSize: 40,
        marginBottom: 5,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
    },
    headline2: {
        fontSize: 25,
        paddingRight: 40,
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
    }
};
export default Style;
