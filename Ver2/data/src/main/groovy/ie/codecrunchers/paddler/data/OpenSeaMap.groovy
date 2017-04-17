package ie.codecrunchers.paddler.data

import com.amazonaws.services.lambda.runtime.Context
import com.amazonaws.services.lambda.runtime.RequestStreamHandler
import ie.codecrunchers.paddler.lib.MapService

class OpenSeaMap implements RequestStreamHandler {


    static def mapService = new MapService()

    void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        int _byte;
        byte[] map = mapService.fetchMap("{}")
        while (_byte < map.length) {
            outputStream.write(map[_byte] as byte);
            _byte++;
        }
    }

}