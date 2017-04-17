package ie.codecrunchers.paddler.lib

/**
 * Created by alan on 17/04/17.
 */
class MapService {


    def MAX_SIZE = 3;

    public byte[] fetchMap(String data) {
        loadMap(data);
    }

    byte[] loadMap(String s) {
        def data = []
        new File("/tmp", 'openmap.png').withReader { reader ->
            def _char;
            while ((_char = reader.read()) != -1) {
                data << _char;
            }
        }

        data
    }
}
