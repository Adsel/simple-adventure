<template>
    <div class="game-board-loader__overlay">
        <div class="game-board-loader__overlay-content">
            <GameTitle></GameTitle>
            <div class="game-board-loader__label">
                <span>{{ loadingStages[loadingStage] }}</span>
                <div class="dot-elastic"></div>
            </div>
            <div class="game-board-loader__wrapper">
                <div class="game-board-loader__progress-bar">
                    <div class="game-board-loader__progress" :style="{ width: progressValue + '%'}">
                        <div class="game-board-loader__progress-value">{{ progressValue + '%' }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import GameTitle from "@/pages/shared/game-title/GameTitle.vue";

export default {
    name: 'GameBoardLoader',
    components: {GameTitle},
    props: {
        progressValue: {
            type: Number,
            required: false,
            default: 0
        },
        loadingStage: {
            type: Number,
            required: false,
            default: 0
        }
    },
    setup() {
        // TODO: wynieść
        const loadingStages = [
            'Nawiązywanie połączenia z serwerem',
            'Wczytywanie grafik'
        ];

        return {loadingStages}
    }

}
</script>
<style lang="scss" scoped>
@import "../../../../assets/styles/components/page/loaders";
</style>
