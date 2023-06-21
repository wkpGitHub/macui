import './layout.less'
export default {
  props: {

  },
  setup (props, { slots }) {
    return () => {
      return <div class={'table-form'}>
        <div class={'table-form__table'}>
          {slots.table?.()}
        </div>
        <div class={'table-form__form'}>
          {slots.form?.()}
        </div>
      </div>
    }
  }
}
