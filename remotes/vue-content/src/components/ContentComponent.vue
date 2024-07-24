<script>
import {defineCustomElement} from 'vue';

const ContentComponent = defineCustomElement({
  template: `This is VUE component`,
});

customElements.define("mf-vue-element", ContentComponent);

export default ContentComponent;
</script>
