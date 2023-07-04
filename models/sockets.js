class Sockets {
    constructor( io ) {
        this.io = io;
        this.socketEvents();
    }

    socketEvents() {
        this.io.on('connection', ( socket ) => {

            socket.on('mensaje-to-server', ( data ) => {
                console.log( data );        
                this.io.emit('mensaje-from-server', data );
            });
        });
    }
}

module.exports = Sockets;