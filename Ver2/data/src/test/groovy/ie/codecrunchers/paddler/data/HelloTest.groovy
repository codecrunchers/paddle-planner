package ie.codecrunchers.paddler.data

/**
 * Created by alan on 17/04/17.
 */
class HelloTest extends spock.lang.Specification {

    def setup() {

    }

    def "I can Run"() {
        given:
        def a = 0
        when:
        a = a + 2
        then:
        a == 2
    }
}
