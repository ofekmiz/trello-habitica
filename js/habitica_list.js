class HabiticaList {
  constructor(
    trello,
    storage = new HabiticaStorage(trello)
  ) {
    this.t = trello
    this.storage = storage
  }

  markAsDone() {
    return this.mark(LIST_TYPES.DONE)
  }

  markAsDoing() {
    return this.mark(LIST_TYPES.DOING)
  }

  async mark(listType) {
    const lists = await this.storage.getLists()
    const list = await this.t.list('id', 'name')

    lists[list.id] = listType

    this.t.closePopup()
    this.notify(`List "${list.name}" was successfully marked`, 'success')
    return this.storage.setLists(lists)
  }

  async unmark() {
    const lists = await this.storage.getLists()
    const list = await this.t.list('id', 'name')

    delete lists[list.id]

    this.t.closePopup()
    this.notify(`List "${list.name}" was successfully unmarked`, 'success')
    return this.storage.setLists(lists)
  }

  notify(message, display = 'info') {
    this.t.alert({
      message,
      display,
      duration: 3
    })
  }
}

// Fails in a browser, but required for tests.
try { module.exports = HabiticaList } catch(_) {}