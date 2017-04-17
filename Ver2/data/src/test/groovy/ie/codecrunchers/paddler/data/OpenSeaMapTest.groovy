package ie.codecrunchers.paddler.data

import spock.lang.Specification

/**
 * Created by alan on 17/04/17.
 */
class OpenSeaMapTest extends Specification {


    void setup() {
        File f = new File("/tmp/openmap.png")
        f.write("123")
    }

    def "HandleRequest"() {
        given:
        OpenSeaMap openSeaMap = new OpenSeaMap()
        OutputStream outputStream = new ByteArrayOutputStream()
        when:
        openSeaMap.handleRequest(null, outputStream, null)
        then:
        outputStream as String == "123"

    }

}
