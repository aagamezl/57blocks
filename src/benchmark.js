const run = (operation) => {
  const startTime = process.hrtime.bigint()
  const startUsage = process.cpuUsage()
  const startMemoryUsage = process.memoryUsage().rss

  operation()

  const endTime = process.hrtime.bigint()
  const elapsedUsage = process.cpuUsage(startUsage)
  const endMemoryUsage = process.memoryUsage().rss

  const elapsedTime = endTime - startTime

  return {
    elapsedTime,
    userCpuUse: elapsedUsage.user,
    systemCpuUse: elapsedUsage.system,
    elapsedMemoryUsage: endMemoryUsage - startMemoryUsage
  }
}

module.exports = {
  run
}
