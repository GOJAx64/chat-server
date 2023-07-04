class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', ( socket ) => {
            //TODO: Validate jwt if is not valid disconnect user

            //TODO: Know who user is active through UID

            //TODO: Emit connected users

            //TODO: Socket Join

            //TODO: Listen when a user send a message

            //TODO: Disconnect

            //TODO: Emit all users connected
            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );        
                this.io.emit('mensaje-from-server', data );
            });
        });
    }
}

module.exports = Sockets;