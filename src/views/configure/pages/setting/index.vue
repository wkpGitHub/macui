<script lang="jsx">
import PageLayoutInfo from '@cip/page-layout/info'
import CipTabs from '@cip/components/cip-tabs-plus'
import CipTabPane from '@cip/components/cip-tabs-plus/tab'
import { reactive } from 'vue'
import PojoPage from '../pojo'
import DicPage from '../dic'

export default {
  setup () {
    const state = reactive({
      active: 0,
      dataModel: {},
      loading: false
    })

    return () => <PageLayoutInfo class="setting-page__container" hideHeader>
      <div class="flex-column setting-page__main">
        <div class="flex-shrink" style="height: 40px;">
          <CipTabs v-model={state.active}>
            <CipTabPane lazy label='枚举' name={0}></CipTabPane>
            <CipTabPane lazy label='自定义对象' name={1}></CipTabPane>
          </CipTabs>
        </div>
        <div class="flex-auto">
          {state.active === 0 && <DicPage />}
          {state.active === 1 && <PojoPage />}
        </div>
      </div>
    </PageLayoutInfo>
  }
}
</script>

<style lang="less">
.setting-page{
  &__container{
    .cip-page-layout-handle__main, .page-layout-left-right--standard{
      padding: 0;
    }
    .page-layout-left-right__left{
        padding: 0;
      }
  }
  &__main{
    height: 100%;
    padding: 10px 10px 0;
    box-sizing: border-box;
    background-color: #fff;
  }
}
</style>
