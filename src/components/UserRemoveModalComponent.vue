<template>
  <div class="c-UserRemoveModalComponent modal fade show" aria-modal="true" role="dialog">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">Ostrzeżenie</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                  @click="$emit('cancel')"
          ></button>
        </div>
        <div class="modal-body">
          <p>Wszystkie dane zostaną bezpowrotnie utracone.</p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal"
                  @click="$emit('cancel')"
          >
            Anuluj
          </button>
          <button type="button" class="btn btn-danger"
            @click="$emit('removeUser')"
          >
            Usuń Konto
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserRemoveModalComponent'
}
</script>

<style lang="scss" scoped>
.c-UserRemoveModalComponent{

  display: block;
  background-color: rgba(0,0,0,0.8);

}
</style>